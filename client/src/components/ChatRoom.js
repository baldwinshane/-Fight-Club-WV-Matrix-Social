import React, { useState, useEffect, useRef } from 'react';
import { MatrixClient } from 'matrix-js-sdk';
import MessageInput from './MessageInput';
import NotificationPanel from './NotificationPanel';

const ChatRoom = ({ matrixClient, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize Matrix client and join room
  useEffect(() => {
    if (!matrixClient || !roomId) return;

    const fetchRoomData = async () => {
      try {
        await matrixClient.joinRoom(roomId);
        const room = matrixClient.getRoom(roomId);
        setRoomName(room.name || 'Fight Club Room');

        // Fetch initial messages
        const timeline = room.getLiveTimeline().getEvents();
        const initialMessages = timeline
          .filter(event => event.getType() === 'm.room.message')
          .map(event => ({
            id: event.getId(),
            sender: event.getSender(),
            content: event.getContent().body,
            timestamp: event.getTs(),
          }));
        setMessages(initialMessages);

        // Listen for new messages
        matrixClient.on('Room.timeline', (event, room, toStartOfTimeline) => {
          if (toStartOfTimeline || room.roomId !== roomId || event.getType() !== 'm.room.message') return;
          setMessages(prev => [
            ...prev,
            {
              id: event.getId(),
              sender: event.getSender(),
              content: event.getContent().body,
              timestamp: event.getTs(),
            },
          ]);
        });
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();

    return () => {
      matrixClient.off('Room.timeline');
    };
  }, [matrixClient, roomId]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (content) => {
    try {
      await matrixClient.sendMessage(roomId, {
        msgtype: 'm.text',
        body: content,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 bg-red-900 border-b border-gray-700">
        <h2 className="text-xl font-bold">{roomName}</h2>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <span className="text-sm text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString()} [{msg.sender}]
              </span>
              <p className="text-base">{msg.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <NotificationPanel roomId={roomId} />
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;