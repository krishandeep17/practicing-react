import { useState } from "react";

import initialFriends from "./data";

import {
  Button,
  FormAddFriend,
  FormSplitBill,
  FriendsList,
} from "./components";

const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((prevValue) => !prevValue);
  };

  const handleAddFriend = (newFriend) => {
    setFriends((prevFriends) => [...prevFriends, newFriend]);

    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));

    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends((currentFriends) =>
      currentFriends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

export default App;
