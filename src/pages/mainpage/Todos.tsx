import { useContext, useEffect, useReducer, useRef, useState } from "react";
import SaveTodos, { fetchTodos } from "../../globalComponents/LsSaver";
import EditTaskModal from "./modal";
import Navbar from "../../globalComponents/Navbar";
import Cases from "../../reducer/Cases";
import { initState, reducer, Todo } from "../../reducer/reducer";
import { SettingContext } from "../../globalComponents/Context";
import { removeEffect, addEffect } from "./sounds";
export const playAudio = (audio: any, access: boolean) => {
  if (access) {
    audio.play();
  }
};
function Todos() {
  const { settings } = useContext(SettingContext);

  const [state, dispatch] = useReducer(reducer, initState);
  const [Value, setValue] = useState("");
  const [EditedTaskID, setEditedTaskID] = useState(0);
  const [ShowModal, setShowModal] = useState(false);
  const [Filter, setFilter] = useState<number>(1);
  const [_, setreRender] = useState<boolean>(false);
  const addAudio = useRef(null);
  const removeAudio = useRef(null);

  const TodosForTables = fetchTodos();

  const Addtask = () => {
    if (Value.trim() !== "") {
      dispatch({ type: Cases.AddTodo, payload: Value });
      setValue("");
      playAudio(addAudio.current, settings.sounds);
    }
  };

  const handleFilter = (number: number) => {
    const todos = fetchTodos();
    if (number === 1) {
      dispatch({ type: Cases.FirstSave, payload: todos });
    } else if (number === 2) {
      dispatch({
        type: Cases.FirstSave,
        payload: todos.filter((todo: Todo) => todo.isDone),
      });
    } else if (number === 3) {
      dispatch({
        type: Cases.FirstSave,
        payload: todos.filter((todo: Todo) => !todo.isDone),
      });
    }
    setFilter(number);
  };

  const Tasks = (todos: []) => {
    return todos.map((todo: any) => {
      if (Filter === 1) {
        return (
          todo !== undefined && (
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
          )
        );
      } else if (Filter === 2 || Filter === 3) {
        return (
          todo !== undefined && (
            <div className="task py-0 justify-content-center" key={todo.id}>
              <div className="cont-1">
                <p className="task-text my-2">{todo.task}</p>
              </div>
            </div>
          )
        );
      }
    });
  };

  useEffect(() => {
    const todos = fetchTodos();

    if (todos.length > 0) {
      dispatch({ type: Cases.FirstSave, payload: fetchTodos() });
    }
  }, []);

  useEffect(() => {
    if (Filter === 1) {
      SaveTodos(state?.todos);
    }
    if (settings.deleteOnDone && state.todos.length > 0) {
      const unCompletedTodos = state?.todos.filter((todo: any) => !todo.isDone);
      if (state.todos.length !== unCompletedTodos.length) {
        dispatch({ type: Cases.FirstSave, payload: unCompletedTodos });
      } else {
      }
    }
    setreRender((r) => !r);
  }, [state?.todos, settings.deleteOnDone, Filter]);

  return (
    <>
      <Navbar what={1} />
      {ShowModal && (
        <EditTaskModal
          show={ShowModal}
          onHide={setShowModal}
          TaskID={EditedTaskID}
          state={state}
          dispatch={dispatch}
          audio={addAudio}
        />
      )}
      <main>
        <section className="to-do-list">
          <div className="content-image"></div>
          <div className="content-act">
            <div className="status">
              <span>وظایف : {TodosForTables.length}</span>
              <span>
                انجام شده ها :{" "}
                {TodosForTables.filter((todo: Todo) => todo.isDone).length}
              </span>
            </div>
          </div>
          <div className="selectTasks">
            <button
              onClick={() => handleFilter(1)}
              className={Filter === 1 ? "selected" : ""}
            >
              همه
            </button>
            <button
              onClick={() => handleFilter(2)}
              className={Filter === 2 ? "selected" : ""}
            >
              انجام شده ها
            </button>
            <button
              onClick={() => handleFilter(3)}
              className={Filter === 3 ? "selected" : ""}
            >
              انجام نشده ها
            </button>
          </div>

          {Filter === 1 && (
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
          )}
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
        <audio ref={addAudio} src={addEffect}></audio>
        <audio ref={removeAudio} src={removeEffect}></audio>
      </main>
    </>
  );
}

export default Todos;
