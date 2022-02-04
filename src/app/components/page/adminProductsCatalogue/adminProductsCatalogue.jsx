import React from 'react';
import PageTitle from '../../common/pageTitle';
import ProductAdminCatalogueItem from '../../ui/product/productAdminCatalogueItem';

const AdminProductsCatalogue = () => {
    return (
        <>
            <div className='row'>
                <PageTitle title={'Редактирование каталога товаров'} />
                <button className='btn btn-primary btn-sm col-1'>Содать</button>
                <ProductAdminCatalogueItem />
                <ProductAdminCatalogueItem />
                <ProductAdminCatalogueItem />
                <ProductAdminCatalogueItem />
                <ProductAdminCatalogueItem />
            </div>
        </>
    );
}

export default AdminProductsCatalogue;