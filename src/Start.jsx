import React from "react";
import { useRef } from "react";

export default function Start({ setUserName }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };
  return (
    <div className="start">
      <h2 className="title">
        "Beshikdan to qabrgacha ilm izla" <br />
        <i>
          <small>Hadis</small>
        </i>
      </h2>
      <div className="label-float">
        <input
          type="text"
          placeholder=" "
          autoComplete="off"
          ref={inputRef}
          required
        />
        <label>Ismingizni kiriting</label>
      </div>

      <button className="btn" onClick={handleClick}>
        Boshlamoq
      </button>

      <p>
        Created by{" "}
        <a className="author" href="https://t.me/islomnumanov_uz">
          Islom Numanov
        </a>
      </p>
      {/* hjhkl */}
    </div>
  );
}
