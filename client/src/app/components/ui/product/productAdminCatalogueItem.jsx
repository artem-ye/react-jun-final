import React from 'react';
import CardTextField from '../../common/card/cardTextField';

const ProductAdminCatalogueItem = () => {
    return (
        <div className='card mb-3 mt-2'>
            <div className='row g-0'>
                <div className='col-md-1 card-body'>
                    <CardTextField title={'id'} value={'10'} />
                </div>
                <div className='col-md-1 card-body'>
                    <CardTextField title={'Наименование'} value={'Сумака'} />
                </div>
                <div className='col-md-1 card-body'>
                    <CardTextField title={'Категория'} value={'Аксессуары'} />
                </div>
                <div className='col-md-1 card-body'>
                    <CardTextField title={'Цена'} value={'1020$'} />
                </div>
                <div className='col-md-1 card-body'>
                    <CardTextField title={'Количество'} value={'10'} />
                </div>
                <div className='col-md-2 card-body'>
                    <CardTextField title={'Фото'} value={'http://img.nothingshop.com/images/100121/previw.jpg'} />
                </div>

                <div className='col-md-2 align-items-center justify-content-center d-flex'>
                    <button className='btn btn-secondary btn-sm me-2' disabled>CОХРАНИТЬ</button>
                    <button className='btn btn-danger btn-sm'>УДАЛИТЬ</button>
                </div>
            </div>
        </div>
    );
}

export default ProductAdminCatalogueItem;