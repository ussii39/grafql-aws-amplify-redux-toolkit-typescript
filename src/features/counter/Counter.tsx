import React, { useState, useEffect } from "react";
import API, { graphqlOperation } from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";

import { createTodo, deleteTodo } from "../../graphql/mutations";
import { listTodos } from "../../graphql/queries";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  incrementByAmount,
  incrementAsync,
  selectCount,
  PostTodo,
} from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const [inputText, SetinputText] = useState("");
  const [Todo, SetTodo] = useState([]);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    async function getData() {
      const todoData: any = await API.graphql(graphqlOperation(listTodos));
      console.log(todoData.data.listTodos.items);
      SetTodo(todoData.data.listTodos.items);
      console.log(Todo);
    }
    getData();
  }, []);
  const input = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetinputText(e.target.value);
  };

  const sendMessage = () => {
    dispatch(incrementAsync(inputText));
  };
  return (
    <div>
      <div>
        <div>
          {Todo.map((t: any, i: number) => (
            <div key={i}>
              <div>{t.description}</div>
            </div>
          ))}
        </div>
        <input type="text" onChange={input} />
        <button onClick={sendMessage}>送信</button>
      </div>
    </div>
  );
}
