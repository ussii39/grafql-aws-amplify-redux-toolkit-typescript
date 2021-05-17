import API, { graphqlOperation } from "@aws-amplify/api";
import { createTodo, deleteTodo } from "../../graphql/mutations";
import { onCreateTodo, onDeleteTodo } from "../../graphql/subscriptions";

export async function fetchCount(todo: string) {
  const todos = { name: "test", description: todo };
  const returned = await API.graphql(
    graphqlOperation(createTodo, { input: todos })
  );
  return returned;
}
