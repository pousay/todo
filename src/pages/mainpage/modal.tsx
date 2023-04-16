import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SettingContext } from "../../globalComponents/Context";
import Cases from "../../reducer/Cases";
import { playAudio } from "./Todos";

interface onHideProps {
  onHide: any;
  show: boolean;
  TaskID: number;
  state: any;
  dispatch: any;
  audio: any;
}

const EditTaskModal: React.FC<onHideProps> = ({
  state,
  dispatch,
  onHide,
  show,
  TaskID,
  audio,
}) => {
  const [Value, setValue] = useState("");
  const { settings } = useContext(SettingContext);
  useEffect(() => {
    if (TaskID > 0) {
      const selectedTask = state?.todos.filter(
        (todo: any) => todo.id === TaskID
      )[0];
      setValue(selectedTask.task);
    }
  }, [TaskID]);

  const EditTask = (Id: number) => {
    dispatch({ type: Cases.EditTodo, id: Id, NewTaskValue: Value });
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Body className="bg-dark">
          <textarea
            value={Value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                EditTask(TaskID);
              }
            }}
            className="w-100 change-input"
          />
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button
            className="w-100 change-button"
            onClick={() => {
              EditTask(TaskID);
              onHide(false);
              playAudio(audio.current, settings.sounds);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTaskModal;
