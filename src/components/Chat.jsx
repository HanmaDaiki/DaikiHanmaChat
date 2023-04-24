import { useState } from 'react';
import { useChannel } from '@/hook/AblyReactEffect';

const Chat = () => {
  const [newMessageText, setNewMessageText] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  const [channel, ably] = useChannel('daikihanma-chat', (message) => {
    setReceivedMessages([...receivedMessages, message]);
  });

  const sendChatMessage = (messageText) => {
    channel.publish({ name: 'chat-message', data: messageText });
    setNewMessageText('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendChatMessage(newMessageText);
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id;
    return (
      <span
        key={index}
        className={`p-3 mb-2 flex w-3/12 break-words py-5 ${author ? 'bg-slate-900' : 'bg-slate-700'
          } text-white text-center rounded-xl ${author ? 'self-start' : 'self-end'
          }`}
      >
        {message.data}
      </span>
    );
  });

  return (
    <div className='w-8/12 h-3/4 flex flex-col items-center border border-slate-100 rounded-2xl'>
      <h1 className='w-full text-xl text-center h-fit px-10 py-5 rounded-t-2xl bg-slate-900 drop-shadow-2xl'>
        Daiki Hanma Chat
      </h1>
      <div className='p-10 flex flex-col w-full h-full bg-slate-300'>
        {messages}
      </div>
      <form className='w-full h-10 bg-slate-900 rounded-b-2xl drop-shadow-2xl flex items-center'>
        <input
          onChange={(event) => setNewMessageText(event.target.value)}
          value={newMessageText}
          className='w-3/4 h-full px-5 outline-none rounded-bl-2xl bg-slate-900 '
        />
        <button
          onClick={(event) => handleSubmit(event)}
          type='button'
          className='w-1/4 h-full rounded-br-2xl bg-slate-700'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export { Chat };
