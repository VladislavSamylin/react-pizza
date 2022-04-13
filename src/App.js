import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setPizzas } from './redux/actions/pizzas';

import { Header } from "./components";
import { Home, Cart } from "./pages";
import { Route, Routes } from "react-router-dom";

const App = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(({ pizzas, filters }) => {
        return {
            items: pizzas.items,
            sortBy: filters.sortBy
        };
    });

    useEffect(() => {
        axios.get('http://localhost:3000/db.json').then(({ data }) => {
            dispatch(setPizzas(data.pizzas));
        });
    }, []);

    return(
      <div className="App">
          <div className="wrapper">
              <Header />
              <div className="content">
                  <Routes>
                      <Route path="/" element={<Home items={items} />} />
                      <Route path="/cart" element={<Cart />} />
                  </Routes>
              </div>
          </div>
      </div>
    );
};

export default App;
