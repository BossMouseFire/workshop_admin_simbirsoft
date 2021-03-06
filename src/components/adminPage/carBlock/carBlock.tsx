import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Layout } from '../layout/layout';
import styles from './carBlock.module.scss';
import { Button, Input, Select } from '../../ui';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ReactComponent as Plus } from '../../../assets/plus.svg';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../../store/actionCreators/categories';
import { ICategory } from '../../../types/actions/categories';
import { EditCardColor } from './editCard';
import { convertImgToBase64 } from '../../../utils/utils';
import { postCar, updateCar } from '../../../api/api';
import { ICar } from '../../../types/actions/cars';
import { Alert } from '../../other';
import { ICarPost } from '../../../types/api';

interface ICarBlock {
  car?: ICar;
}

export const CarBlock: React.FC<ICarBlock> = ({ car }) => {
  const { categories } = useTypeSelector((state) => state.categories);
  const dispatch = useDispatch();
  const refInputImg = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>(
    car ? car.thumbnail?.path : ''
  );
  const [nameCar, setNameCar] = useState<string>(car ? car.name : '');
  const [typeCar, setTypeCar] = useState<ICategory>();
  const [maxPrice, setMaxPrice] = useState<number>(car ? car.priceMax : 0);
  const [minPrice, setMinPrice] = useState<number>(car ? car.priceMin : 0);
  const [number, setNumber] = useState<string>(car ? car.number : '');
  const [description, setDescription] = useState<string>(
    car ? car.description : ''
  );
  const [colors, setColors] = useState<string[]>(car ? car.colors : []);

  const [stateColor, setStateColor] = useState<string>('');

  const [nameCarError, setNameCarError] = useState<boolean>(false);
  const [maxPriceError, setMaxPriceError] = useState<boolean>(false);
  const [minPriceError, setMinPriceError] = useState<boolean>(false);
  const [numberError, setNumberError] = useState<boolean>(false);

  const [typeResponse, setTypeResponse] = useState<'info' | 'error'>('info');
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isCanceled, setCanceled] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCategories());
    if (car) {
      setTypeCar(car.categoryId);
    }
  }, []);

  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        setIsAlert(false);
      }, 5000);
    }
  }, [isAlert]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const changeTypeCar = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (categories.length) {
      categories.map((category) => {
        if (category.id === id) {
          setTypeCar(category);
        }
      });
    }
  };

  const changeNameCar = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNameCar(name);
    setNameCarError(false);
  };

  const changeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setNumber(number);
    setNumberError(false);
  };

  const changeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    if (!isNaN(price)) {
      setMaxPrice(price);
      setMaxPriceError(false);
    }
  };

  const changeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    if (!isNaN(price)) {
      setMinPrice(price);
      setMinPriceError(false);
    }
  };

  const addColor = () => {
    if (stateColor) {
      let isAdded = false;

      colors.forEach((color) => {
        if (color.toLowerCase() === stateColor.toLowerCase()) {
          isAdded = true;
        }
      });
      if (!isAdded) {
        setColors([...colors, stateColor]);
      }
    }
  };

  const onCancel = () => {
    setNameCar('');
    setTypeCar(undefined);
    setDescription('');
    setColors([]);
    setNumber('');
    setMaxPrice(0);
    setMinPrice(0);
    setPreview('');
    setStateColor('');
    setSelectedFile(undefined);
    setCanceled(true);
  };

  const onSaveCar = () => {
    let isError = false;

    if (!nameCar) {
      setNameCarError(true);
      isError = true;
    }

    if (minPrice < 0 || minPrice >= maxPrice) {
      setMinPriceError(true);
      isError = true;
    }

    if (maxPrice < 0 || minPrice >= maxPrice) {
      setMaxPriceError(true);
      isError = true;
    }

    if (!number) {
      setNumberError(true);
      isError = true;
    }

    if (!typeCar) {
      isError = true;
    }

    if (isError) {
      return;
    }

    if (!selectedFile && car) {
      const carObj = {
        priceMax: maxPrice,
        priceMin: minPrice,
        name: nameCar,
        description: description,
        categoryId: typeCar?.id,
        number: number,
        colors: colors,
      } as ICarPost;
      updateCar(carObj, car.id)
        .then(() => {
          setTypeResponse('info');
          setIsAlert(true);
        })
        .catch(() => {
          setTypeResponse('error');
          setIsAlert(true);
        });
    }

    if (selectedFile) {
      convertImgToBase64(selectedFile, (response) => {
        const carObj = {
          priceMax: maxPrice,
          priceMin: minPrice,
          name: nameCar,
          thumbnail: {
            path: response,
            size: selectedFile.size,
            originalname: selectedFile.name,
            mimetype: selectedFile.type,
          },
          description: description,
          categoryId: typeCar?.id,
          number: number,
          colors: colors,
        } as ICarPost;

        if (car && !isCanceled) {
          updateCar(carObj, car.id)
            .then(() => {
              setTypeResponse('info');
              setIsAlert(true);
            })
            .catch(() => {
              setTypeResponse('error');
              setIsAlert(true);
            });
        } else {
          postCar(carObj)
            .then(() => {
              setTypeResponse('info');
              setIsAlert(true);
            })
            .catch(() => {
              setTypeResponse('error');
              setIsAlert(true);
            });
        }
      });
    }
  };

  return (
    <Layout nameLayout={'???????????????? ????????????????????'}>
      <div className={styles.carBlock}>
        <div className={styles.carView}>
          <div className={styles.preview}>
            {preview && <img src={preview} />}
            {!preview && <div>???????????????? ??????????????????????</div>}
          </div>
          <div className={styles.prevSpan}>
            <span>{nameCar}</span>
            <span>{typeCar?.name}</span>
          </div>
          <Input
            type={'file'}
            refInput={refInputImg}
            className={styles.inputFileBlock}
            accept={'image/*'}
            onChange={onSelectFile}
          />
          <div className={styles.description}>
            <span>????????????????</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.carOptions}>
          <span className={styles.title}>?????????????????? ????????????????????</span>
          <div className={styles.mainOptions}>
            <div>
              <span>???????????? ????????????????????</span>
              <Input
                isError={nameCarError}
                placeholder={'????????????'}
                onChange={changeNameCar}
                value={nameCar}
              />
            </div>
            <div>
              <span>??????????</span>
              <Input
                isError={numberError}
                placeholder={'??????????'}
                onChange={changeNumber}
                value={number}
              />
            </div>
            <div>
              <span>?????? ????????????????????</span>
              <Select
                data={categories}
                sizeSelect={'auto'}
                onChange={changeTypeCar}
                defaultSelectedId={typeCar?.id}
              />
            </div>
            <div>
              <span>?????????????????? ??????????</span>
              <div className={styles.colorButton}>
                <Input
                  placeholder={'???????????????? ????????'}
                  value={stateColor}
                  onChange={(e) => setStateColor(e.target.value)}
                />
                <div className={styles.addColor} onClick={addColor}>
                  <Plus />
                </div>
              </div>
            </div>
            <div>
              <span>??????. ??????????????????</span>
              <Input
                isError={minPriceError}
                placeholder={'????????????????'}
                value={minPrice}
                onChange={changeMinPrice}
              />
            </div>
            <div>
              <span>????????. ??????????????????</span>
              <Input
                isError={maxPriceError}
                placeholder={'????????????????'}
                value={maxPrice}
                onChange={changeMaxPrice}
              />
            </div>
          </div>
          <div className={styles.colors}>
            {colors.map((color, index) => (
              <EditCardColor
                color={color}
                colors={colors}
                setColors={setColors}
                key={index}
              />
            ))}
          </div>
          <div className={styles.buttons}>
            <Button size={'s'} color={'blue'} onClick={onSaveCar}>
              ??????????????????
            </Button>
            <Button size={'s'} onClick={onCancel}>
              ????????????????
            </Button>
          </div>
        </div>
      </div>
      <Alert
        type={typeResponse}
        visible={isAlert}
        onClick={() => setIsAlert(false)}
      >
        {typeResponse === 'info' && '???????????? ?????????????? ??????????????????'}
        {typeResponse === 'error' && '?????????????????? ???????????? ?????? ????????????????????'}
      </Alert>
    </Layout>
  );
};
