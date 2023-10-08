import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
