import styles from './Spinner.css';

export default function Spinner({ text }) {
  return (
    <div className="spinner">
      <div className="spinner__spinnerEl"></div>
      {text && <span className="spinner__text">{text}</span>}
    </div>
  );
}
