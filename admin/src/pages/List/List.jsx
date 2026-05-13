import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${apiUrl}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Something going wrong here");
    }
  };

  const removeFood = async (id) => {
    const response = await axios.delete(`${apiUrl}/api/food/remove/${id}`);
    await fetchList();
    if(response.data.success) {
      toast.success(response.data.message)
      
    }else {
      toast.error("Error")
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-tabl">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {list.map((item) => {
          return (
            <div key={item._id} className="list-table-format">
              <img src={`${apiUrl}/images/${item.image}`} alt="image of food" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
