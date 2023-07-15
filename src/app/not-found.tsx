import styles from "./components/styles/not-found.module.css";
export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.title}> 원하시는 페이지를 찾을 수 없습니다. </div>
      <p className={styles.text}>찾으려는 페이지의 주소가 잘못 입력되었거나</p>
      <p className={styles.text}>주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</p>
      <p className={styles.text}>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</p>
    </div>
  );
}
