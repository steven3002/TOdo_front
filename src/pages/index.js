import { useState, useEffect, useContext } from 'react';
import { TodoApp } from '@/todoMain/todo';
import { NearContext } from '@/context';
import NProgress from 'nprogress';

import { HelloNearContract } from '../config';


// Contract that the app will interact with
const CONTRACT = HelloNearContract;

export default function HelloNear() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [greeting, setGreeting] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  NProgress.configure({ showSpinner: true });
  useEffect(() => {
    if (!signedAccountId) { return }
    else {
      data1()
    };
  }, [signedAccountId]);

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
    data1
    console.log(signedAccountId)
  }, [signedAccountId]);




  const data1 = async () => {
    NProgress.start();
    setShowSpinner(true);
    let data = await wallet.callMethod({ contractId: CONTRACT, method: 'list_todos', args: {} });
    setGreeting(data)
    console.log(data)
    setShowSpinner(false);
    NProgress.done();
  }
  const handleDeleteM = async (index) => {
    NProgress.start();
    setShowSpinner(true);
    await wallet.callMethod({ contractId: CONTRACT, method: 'delete_todo', args: { id: index } })
    let data = await wallet.callMethod({ contractId: CONTRACT, method: 'list_todos', args: {} });
    setGreeting(data)
    console.log(data)
    alert("todo deleted.");
    setShowSpinner(false);
    NProgress.done();
  }

  const handleCompleted = async (index) => {
    NProgress.start();
    setShowSpinner(true);
    await wallet.callMethod({ contractId: CONTRACT, method: 'set_completed', args: { id: index } })
    let data = await wallet.callMethod({ contractId: CONTRACT, method: 'list_todos', args: {} });
    setGreeting(data)
    console.log(data)
    setShowSpinner(false);
    NProgress.done();
  }
  const handleinputvalue = async (value) => {
    NProgress.start();
    setShowSpinner(true);
    await wallet.callMethod({ contractId: CONTRACT, method: 'add_todo', args: { text: value } })
    let data = await wallet.callMethod({ contractId: CONTRACT, method: 'list_todos', args: {} });
    setGreeting(data)
    console.log(data)
    setShowSpinner(false);
    NProgress.done();
  }



  return (
    <>
      <div className="w-100 text-end align-text-center" hidden={loggedIn}>
        <h3>Please login</h3>

      </div>

      <div className='subbody' hidden={!loggedIn}>
        <TodoApp todoData={greeting} handleDelete={handleDeleteM} handleCompleted={handleCompleted} handleInputValue={handleinputvalue} />
      </div>
    </>
  );
}