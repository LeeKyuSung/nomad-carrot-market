"use client";

import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";

export default function Home() {
  const [darkTheme, setDarkTheme] = useState("");

  // localStorage에 저장된 값이 있으면 가져옴
  useEffect(() => {
    const localTheme = localStorage.getItem("darkTheme");
    if (localTheme) setDarkTheme(localTheme);
    else setDarkTheme("system");
  }, []);

  const handleRadioChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    if (darkTheme !== e.target.value) setDarkTheme(e.target.value);
  };

  useEffect(() => {
    // localStorage에 저장
    localStorage.setItem("darkTheme", darkTheme);

    if (darkTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        console.log(darkTheme);
        if (darkTheme === "system") {
          if (mediaQuery.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      };
      handleChange();

      // 시스템 설정이 바뀔 때 테마 적용하도록 mediaQuery에 이벤트 리스너 추가
      mediaQuery.addEventListener("change", handleChange);
      // Clean up
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      if (darkTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (darkTheme === "light") {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkTheme]);

  return (
    <div className="bg-slate-400 dark:bg-black xl:place-content-center py-20 px-20 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 min-h-screen">
      <div className="bg-[url('https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg')] p-6 rounded-3xl shadow-xl">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between">
            <input
              type="radio"
              id="system"
              name="darkTheme"
              value="system"
              checked={darkTheme === "system"}
              onChange={handleRadioChange}
            />
            <label htmlFor="system">시스템 설정 사용</label>
          </div>
          <div className="flex flex-row justify-between">
            <input
              type="radio"
              id="dark"
              name="darkTheme"
              value="dark"
              checked={darkTheme === "dark"}
              onChange={handleRadioChange}
            />
            <label htmlFor="dark">어두운 테마</label>
          </div>
          <div className="flex flex-row justify-between">
            <input
              type="radio"
              id="light"
              name="darkTheme"
              value="light"
              checked={darkTheme === "light"}
              onChange={handleRadioChange}
            />
            <label htmlFor="light">밝은 테마</label>
          </div>
        </form>
      </div>
      <div className="bg-white sm:bg-red-400 md:bg-teal-400 lg:bg-indigo-400 xl:bg-yellow-400 2xl:bg-pink-500 p-6 rounded-3xl shadow-xl">
        <span className="font-semibold text-3xl">Select Item</span>

        <ul>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex justify-between my-2 odd:bg-gray-100 even:bg-gray-200 p-2 rounded-xl"
            >
              <span className="text-gray-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
        {["a", "b", ""].map((c, i) => (
          <li className="bg-red-500 py-2 empty:hidden" key={i}>
            {c}
          </li>
        ))}

        <div className="flex justify-between my-2">
          <span className="text-gray-500">Tooly Table</span>
          <span className="font-semibold">$80</span>
        </div>

        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$99</span>
        </div>
        <button
          className="mt-5 bg-blue-500 text-white p-3
         text-center rounded-xl w-1/2 mx-auto hover:bg-teal-500
          hover:text-black active:bg-yellow-500 focus:bg-red-500"
        >
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-2xl shadow-xl group">
        <div className="bg-blue-500 landscape:bg-teal-400  p-6 pb-14">
          <span className="text-white text-2xl ">Profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-9">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-red-400 rounded-full group-hover:bg-zinc-500 transition-colors" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 -mb-5">
            <span className="text-lg font-medium">Tony Molly</span>
            <span className="text-sm text-gray-500">New York, USA</span>
          </div>
        </div>
      </div>
      <form className="flex flex-col space-y-2 bg-blue-400 rounded-2xl shadow-xl p-5 focus-within:bg-blue-100">
        <input
          type="text"
          required
          placeholder="Username"
          className="required:border-2 border-yellow-500
          invalid:bg-red-500
          peer"
        ></input>
        <input
          type="password"
          required
          placeholder="Password"
          disabled
          className="
          placeholder-shown:bg-green-500
          disabled:bg-red-300"
        ></input>
        <span className="peer-invalid:text-red-500 peer-valid:hidden">
          This input is invalid
        </span>
        <span className="hidden peer-valid:block">This input is valid</span>
        <input type="submit" value="Login" className="bg-white"></input>
      </form>
      <div className="bg-white p-10 rounded-2xl shadow-xl group">
        <div className="flex mb-5 justify-between items-center">
          <span>⬅️</span>
          <div className=" space-x-3">
            <span>⭐️ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">💖</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5 group-hover:bg-red-400" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
            </div>
            <div className="flex items-center space-x-5">
              <button className="bg-blue-200 flex justify-center items-center aspect-square w-10 text-xl text-gray-500 rounded-lg">
                -
              </button>
              <span>1</span>
              <button className="bg-blue-200 flex justify-center items-center aspect-square w-10 text-xl text-gray-500 rounded-lg">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 py-2 px-8 text-center text-xs text-white rounded-lg">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl group">
        <details className="select-none open:text-white open:bg-indigo-300">
          <summary className="cursor-pointer">
            What is my favorite food.
          </summary>
          <span>김치</span>
        </details>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl group">
        <ul className="list-decimal marker:text-teal-500">
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
        </ul>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl group xl:col-span-2">
        <input
          type="file"
          className="file:cursor-pointer
          file:hover:text-purple-500 file:hover:bg-white file:hover:border-purple-500 file:hover:border
          file:transition-colors
          file:border file:rounded-xl file:px-5 file:text-white file:bg-purple-500 "
        />
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl group">
        <p
          className="first-letter:text-7xl first-letter:uppercase
          first-letter:hover:text-purple-400"
        >
          asdfzxcvo 123ohhnf;oaisdnf 13
        </p>
      </div>
    </div>
  );
}
