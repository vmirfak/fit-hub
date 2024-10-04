import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const FoodPlans = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Diet Plans" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
      </div>
    </DefaultLayout>
  );
};

export default FoodPlans;
