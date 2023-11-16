import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from '@/hooks';
import bannerImg from '@/images/banner1.png';
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  useDocumentTitle('ByteFusion | Главная');
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>ByteFusion</strong>
              &nbsp;- разработан с&nbsp;
              <strong>❤️ любовью </strong>
            </h1>
            <p>
              Быстрый и отзывчивый интернет-магазин. Разработан на ReactJS командой PRO100BYTE
            </p>
            <br />
            <Link to={SHOP} className="button">
              Начать покупки &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Новинки</h1>
            <Link to={FEATURED_PRODUCTS}>Просмотреть все</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Попробовать еще раз"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Рекомендуем Вам</h1>
            <Link to={RECOMMENDED_PRODUCTS}>Просмотреть все</Link>
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Попробовать еще раз"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
