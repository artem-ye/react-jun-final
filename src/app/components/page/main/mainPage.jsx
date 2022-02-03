import React from 'react';
import SearchBar from '../../ui/searchbar';

const MainPage = () => {
    return (
        <div className='container mt-2'>
            <SearchBar />

            <div className='row'>
                <div className='col-3'>
                    <ul className='list-group'>
                        <li className='list-group-item'>Сумки</li>
                        <li className='list-group-item'>Купальники</li>
                        <li className='list-group-item'>Палки</li>
                        <li className='list-group-item'>Пылесосные шланги</li>
                        <li className='list-group-item'>Бетон</li>
                    </ul>
                </div>
                <div className='col-9'>
                    <select className='form-select form-select-sm' aria-label='.form-select-sm example'>
                        <option selected>Сортировка: По цене</option>
                        <option value='1'>One</option>
                        <option value='2'>Two</option>
                        <option value='3'>Three</option>
                    </select>

                    <div className='card mb-3 mt-2'>
                        <div className='row g-0'>
                            <div className='col-md-2 align-items-center justify-content-center d-flex'>
                                <img
                                    src='http://img.nothingshop.com/images/200151/default/preview.jpg'
                                    className='img-fluid rounded-start'
                                    alt='...'
                                    style={{ maxWidth: '100px' }}

                                />
                            </div>
                            <div className='col-md-10'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Card title</h5>
                                    <p className='card-text'>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </p>
                                    <p className='card-text'>
                                        <small className='text-muted'>Last updated 3 mins ago</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
