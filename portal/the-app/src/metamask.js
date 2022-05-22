import * as React from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, setPk } from "./store";


const ONBOARD_TEXT = "Click here to install MetaMask!";
// 當 USER 未下載 **MetaMask Chrome extension**
const CONNECT_TEXT = "Welcome!";
// 當 USER 已下載 **MetaMask Chrome extension**
const CONNECTED_TEXT = "Connected";
// 當 USER 已經連接到 Ethereum 帳戶

export default function Metamask() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  dispatch(setPk("1223"));

  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  // 按鈕要呈現的文字
  const [isDisabled, setDisabled] = useState(false);
  // 跳出下載頁面的時候要使按鈕無效
  const [accounts, setAccounts] = useState([]);
  // 之後要用來記錄 使用者的 ethereum 帳號
  const onboarding = React.useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        // 在登入之前 acoount 都不會紀錄任何資料，所以長度會是 0
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <button disabled={isDisabled} onClick={onClick}>
      {account}
    </button>
  );
}
