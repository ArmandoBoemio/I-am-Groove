import { Component } from "react";
import './Dropdown.css';

class Dropdown extends Component{

   constructor(props){
       super(props);

       this.state={
            options: [2,3,4,5,6,7],
            active: false,
            selectedOpt: 4

       }
   }


   componentDidUpdate(){
       const {active}=this.state;

       setTimeout(()=>{
        if(active){
            window.addEventListener('click', this.toggleDropdown)
         }else{
            window.removeEventListener('click', this.toggleDropdown)
    }
},0)
       
   }


   toggleDropdown = () => {
   this.setState({active: !this.state.active})
   }

   setSelectedElement = (option) =>{
       this.setState({selectedOpt: option}, ()=>this.props.afterStateSet(option));
   }

   render(){
        let {active, options}=this.state;

            return( 

                <>

                <div className="dropdownToggleContainer">
                    <button className="activateDropdown" 
                        onClick={this.toggleDropdown}>
                        {this.state.selectedOpt + "/4"}
                    </button>
                </div>

                {active && (
                    <div className="dropdownOptionsContainer">
                
                        {options.map((option)=>(
                        
                        <button className="optionButton"
                            type="button"  
                            key={option} 
                            onClick={()=>this.setSelectedElement(option)}>
                            {option}
                        </button>
                        )
                        )
                        }

                    </div>
            )}
            </>);
        }



   }




export default Dropdown