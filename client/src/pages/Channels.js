import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom';

const Channels = ({ matrixClient }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [error, setError] = useState('');

  // Fetch available rooms
  useEffect(() => {
    if (!matrixClient) return;

    const fetchRooms = async () => {
      try {
        const joinedRooms = matrixClient.getRooms().filter(room => room.getMyMembership() === 'join');
        setRooms(joinedRooms.map(room => ({
          id: room.roomId,
          name: room.name || 'Unnamed Room',
        })));
      } catch (err) {
        setError('Failed to load channels');
        console.error(err);
      }
    };

    fetchRooms();
    matrixClient.on('Room', fetchRooms); // Update rooms on room changes

    return () => {
      matrixClient.off('Room');
    };
  }, [matrixClient]);

  // Handle joining a new room
  const handleJoinRoom = async (roomAlias) => {
    try {
      const room = await matrixClient.joinRoom(roomAlias);
      setRooms(prev => [...prev, { id: room.roomId, name: room.name || 'Unnamed Room' }]);
      setSelectedRoomId(room.roomId);
    } catch (err) {
      setError('Failed to join room');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold text-red-600 mb-4">Channels</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li key={room.id}>
              <button
                onClick={() => setSelectedRoomId(room.id)}
                className={`w-full text-left p-2 rounded ${
                  selectedRoomId === room.id ? 'bg-red-600' : 'hover:bg-gray-700'
                }`}
              >
                {room.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter room alias (e.g., #fightclub:server)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleJoinRoom(e.target.value);
                e.target.value = '';
              }
            }}
            className="w-full p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>
      <div className="flex-1">
        {selectedRoomId ? (
          <ChatRoom matrixClient={matrixClient} roomId={selectedRoomId} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Select a channel to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Channels;