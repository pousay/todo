import { useContext, useEffect, useReducer, useRef, useState } from "react";
import SaveTodos, { fetchTodos } from "../../globalComponents/LsSaver";
import EditTaskModal from "./modal";
import Navbar from "../../globalComponents/Navbar";
import Cases from "../../reducer/Cases";
import { initState, reducer } from "../../reducer/reducer";
import { SettingContext } from "../../globalComponents/Context";

export const playAudio = (audio: any, access: boolean) => {
  if (access) {
    console.log(audio);

    audio.play();
  }
};
function Todos() {
  const { settings } = useContext(SettingContext);

  const [state, dispatch] = useReducer(reducer, initState);
  const [Value, setValue] = useState("");
  const [EditedTaskID, setEditedTaskID] = useState(0);
  const [ShowModal, setShowModal] = useState(false);

  const addAudio = useRef(null);
  const removeAudio = useRef(null);

  const Addtask = () => {
    if (Value.trim() !== "") {
      dispatch({ type: Cases.AddTodo, payload: Value });
      setValue("");
      playAudio(addAudio.current, settings.sounds);
    }
  };

  const Tasks = (todos: []) => {
    return todos.map((todo: any) => (
      <div className="task py-0" key={todo.id}>
        <div className={todo.isDone ? "cont-1 completed" : "cont-1"}>
          <i
            className={
              todo.isDone
                ? "fa-regular fa-circle done-one cirl"
                : "fa-regular fa-circle done-one"
            }
            onClick={() => {
              dispatch({ type: Cases.DoneUnDone, payload: todo.id });
              if (settings.deleteOnDone && !todo.isDone) {
                playAudio(removeAudio.current, settings.sounds);
              }
            }}
          ></i>
          <p className="task-text my-2">{todo.task}</p>
        </div>
        <div className="each-task-cont">
          <div
            className="cont-2"
            onClick={() => {
              dispatch({ type: Cases.RemoveTodo, payload: todo.id });
              playAudio(removeAudio.current, settings.sounds);
            }}
          >
            <i className="fa-solid fa-trash-can delete-one"></i>
          </div>
          <span
            onClick={() => {
              setEditedTaskID(todo.id);
              setShowModal(true);
            }}
            className="fa fa-pencil"
          ></span>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    const todos = fetchTodos();
    if (todos.length > 0) {
      dispatch({ type: Cases.FirstSave, payload: fetchTodos() });
    }
  }, []);

  useEffect(() => {
    SaveTodos(state?.todos);
    if (settings.deleteOnDone && state.todos.length > 0) {
      const unCompletedTodos = state?.todos.filter((todo: any) => !todo.isDone);
      if (state.todos.length !== unCompletedTodos.length) {
        dispatch({ type: Cases.FirstSave, payload: unCompletedTodos });
      } else {
      }
    }
  }, [state?.todos, settings.deleteOnDone]);

  return (
    <>
      <Navbar what={1} />
      <EditTaskModal
        show={ShowModal}
        onHide={setShowModal}
        TaskID={EditedTaskID}
        state={state}
        dispatch={dispatch}
        audio={addAudio}
      />
      <main>
        <section className="to-do-list">
          <div className="content-image"></div>
          <div className="content-act">
            <div className="status">
              <span>وظایف : {state?.todos.length}</span>
              <span>
                انجام شده ها :{" "}
                {state?.todos.filter((todo: any) => todo.isDone).length}
              </span>
            </div>
          </div>
          <div className="add-task">
            <span
              className="del"
              onClick={() => {
                dispatch({ type: Cases.Reset });
                playAudio(removeAudio.current, settings.sounds);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </span>
            <input
              value={Value}
              onChange={(e: any) => {
                setValue(e.target.value);
              }}
              type="text"
              placeholder="وظیفه را وارد کنید..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  Addtask();
                }
              }}
            />
            <span className="add-task-btn" onClick={Addtask}>
              <i className="fa-solid fa-plus"></i>
            </span>
          </div>
          {state?.todos.length <= 0 && (
            <div className="no-tasks pb-0">
              <p>
                <i className="fa-regular fa-circle-xmark"></i> وظیفه ای ثبت
                نشده!
              </p>
            </div>
          )}
          <div className="tasks">
            {state?.todos.length > 0 && Tasks(state?.todos)}
          </div>
        </section>
        {/* Audio Sounds  */}
        <audio
          ref={addAudio}
          src="https://storage.cloudconvert.com/tasks/59919726-39f9-46b3-8aa4-dd9a9708a0ba/addt.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1683636836&Signature=ffGUJ%2B%2BS3gIR7IRr9HFG24CbjgU%3D&response-content-disposition=attachment%3B%20filename%3D%22addt.mp3%22&response-content-type=audio%2Fmpeg"
        ></audio>
        <audio
          ref={removeAudio}
          src="https://storage.cloudconvert.com/tasks/3a3cdb97-5dfe-490b-8f9c-fe86804636e6/remove.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1683636837&Signature=1iF2HFGNmp0tah9bthN%2BkEaXafw%3D&response-content-disposition=attachment%3B%20filename%3D%22remove.mp3%22&response-content-type=audio%2Fmpeg"
        ></audio>
      </main>
    </>
  );
}

export default Todos;
