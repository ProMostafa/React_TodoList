import React, { Component } from 'react';
import TodoInput from './todoInput';
import TodoList from './TodoList';
import ModalPop from './Modal';
import { v4 as uuidv4 } from 'uuid';

import '../Style/App.css'
class App extends Component {
    state = { 
        items:[],
        id:0,
        item:"",
        editItem:false,
        isOpen:false
     }
     handleChange = e =>{
         this.setState({
             item: e.target.value
         });
     };

     handleSubmit = e =>{
        e.preventDefault();

        const newItem = {
            id:this.state.id,
            title:this.state.item
        }
        console.log(newItem);
        const updateItems = [...this.state.items,newItem];
         
        this.setState({
            items:updateItems,
            item:"",
            id:uuidv4(),
            editItem:false
        });
     };

     clearList = ()=>{
         console.log("clear List")
         this.setState({
             items:[]
         })
     };

     handleDelete = id =>{
         const filterItems = this.state.items.filter(item =>(
             item.id !== id
         ))

         this.setState({
             items: filterItems
         });
     };
     handleEdit = id =>{
        const filterItems = this.state.items.filter(item =>(
            item.id !== id
        ))
        const selectItem = this.state.items.find(item => item.id === id);
        console.log(selectItem);
        this.setState({
            items: filterItems,
            item:selectItem.title,
            editItem:true,
            id:id
        });
     };
     toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      };

      componentDidMount() {
        this.interval = setInterval(() => this.setState({ isOpen:true }), 5000);
      }
    render() { 
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-8 mt-4">
                        <h3 className="text-capitalize text-center">
                            todo input
                        </h3>
                        <TodoInput  
                          item={this.state.item} 
                           handleChange={this.handleChange} 
                           handleSubmit={this.handleSubmit}
                           editItem={this.state.editItem}
                        />
                        <TodoList  
                          items={this.state.items} 
                          clearList={this.clearList} 
                          handleDelete={this.handleDelete}
                          handleEdit={this.handleEdit}

                        />
                        {this.state.isOpen ? <ModalPop />: null}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default App;