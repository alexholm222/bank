import s from "./Button.module.scss";
import classNames from "classnames";
//components
import LoaderButton from "./LoaderButton/LoaderButton";

const Button = ({
  handler,
  buttonText,
  Icon,
  isLoading,
  type,
  disabled,
  width,
}) => {
  return (
    <div
      style={{ width: `${width ? `${width}px` : ""}` }}
      onClick={handler}
      className={classNames(s.root, disabled && s.root_disabled)}
    >
      {type === "right" && <p>{buttonText}</p>}
      <div className={s.container}>
        <Icon className={classNames(s.icon, isLoading && s.icon_hidden)} />
        <div className={classNames(s.loader, isLoading && s.loader_vis)}>
          <LoaderButton color={"#FFF"} />
        </div>
      </div>

      {type !== "right" && <p>{buttonText}</p>}
    </div>
  );
};

export default Button;
