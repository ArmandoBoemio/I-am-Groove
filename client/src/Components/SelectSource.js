import { Component } from "react";
import './SelectSource.css'


class SelectSource extends Component{

   constructor(props){
       super(props);

       this.state={
            active: false,
       }
   }


    componentDidUpdate(){
        const {active}=this.state;

        setTimeout(()=>{
            if (active) {
                window.addEventListener('click', this.toggleDropdown)
            } else {
                window.removeEventListener('click', this.toggleDropdown)
            }
        },10)     
    }


    toggleDropdown = () => {
        this.setState({active: !this.state.active})
    }

    setSelectedElement = (option) => {
        this.setState({selectedOpt: option}, () => this.props.afterStateSet(option));
    }


    render(){

        let {active}=this.state;
        let {options}=this.props;

            return( 

                <>
                    <button className="load" onClick={this.toggleDropdown}>Load</button>

                    {active && (

                        <div className="load">
                        
                        {options.map((option) => (

                            <button type="button" className="optionButtonSource" key={option} onClick={()=>this.setSelectedElement(option)} style={{display: 'flex', flexDirection: 'vertical', flexWrap: 'wrap'}}>
                                {option} 
                            </button>

                        ))}

                        </div>
                    )}
                </>
            )
    }

}


export default SelectSource