import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { Notification, Loader } from '../../../components';
import { ImageList, ImageCreate } from '../components';
import { TitleBox } from '../../../assets/styles';

import { handleGetImageFiles } from '../actions';

// Convert data
const groupImageByType = (data) => {
  let imagesbytype = [];

  data.forEach(item => {
    let _plan_image = item.plan_image;
    let plan_image_key = 'type-' + item.plan_image.id;
    // let item_key = 'img-' + item.id;
    if (!imagesbytype[plan_image_key]) {
      imagesbytype[plan_image_key] = { data: _plan_image, images: [] };
    }
    // imagesbytype[plan_image_key]['images'][item_key] = item;
    imagesbytype[plan_image_key]['images'].push(item);
  });

  return Object.values(imagesbytype);
};

function PlanImages({ planSid, pgSid, planImages }) {
  const dispatch = useDispatch();
  const [images, setImages] = useState(null);
  const query = {
    page: 1,
    page_size: 100,
    plan_image_ids: null
  };
  const [reload, setReload] = useState(null);

  // Cách này là goi for each trong vòng lặp ==> Không biết xử lý sao
  /*useEffect(() => {
    planImages.forEach(item => {
      const query = { page: 1, page_size: item.max_image, plan_image_ids: item.id };

      dispatch(handleGetImageFiles(planSid, query, ({ error, message, total, data }) => {
        const obj = {
          id: item.id,
          label: item.label,
          data: data
        };
        console.log('obj: ', obj);
      }));
    });
  }, []);*/

  useEffect(() => {
    dispatch(handleGetImageFiles(planSid, query, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        const convertData = groupImageByType(data);
        setImages(convertData);
      }
    }));
  }, [reload]);

  const handleReload = (data) => {
    setReload(data);
  };


  if (!images) {
    return <Loader />
  }

  return (
    <div className="formBox">
      <TitleBox>Hình ảnh</TitleBox>
      <div className="formBoxContent">
        {
          images.length > 0 ? (
            <Fragment>
              <ImageCreate
                planSid={planSid}
                pgSid={pgSid}
                planImages={planImages}
                handleReload={handleReload}
              />
              <ImageList
                images={images}
                planSid={planSid}
                handleReload={handleReload}
              />
            </Fragment>
          ) : (
              <h3 style={{ padding: '0 30px 30px 30px' }}>Không có hình ảnh.</h3>
            )
        }
      </div>
    </div>
  )
}

export default PlanImages;