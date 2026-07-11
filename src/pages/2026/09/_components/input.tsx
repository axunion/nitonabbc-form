import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import styles from "./input.module.css";

type Props = JSX.InputHTMLAttributes<HTMLInputElement> & {
  autocompleteOptions?: readonly string[];
};

export default function Input(props: Props) {
  const [local, rest] = splitProps(props, ["autocompleteOptions"]);
  const listId = () => (rest.name ? `${rest.name}-list` : undefined);
  return (
    <div class={styles.wrapper}>
      <input class={styles.input} list={listId()} {...rest} />
      {local.autocompleteOptions && (
        <datalist id={listId()}>
          {local.autocompleteOptions.map((opt) => (
            <option value={opt} />
          ))}
        </datalist>
      )}
    </div>
  );
}
