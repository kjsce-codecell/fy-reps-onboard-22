import React from "react";
import styles from "../../../styles/Stepper.module.css";
import Step from "./Step";

type Props = {
	items: 
		{
			title: string;
			description: string;
            icon:{
                src:string,
                height:number,
                width:number,
            }
		}[]
	;
};

const Stepper = (props: Props) => {
	const { items } = props;
	return (
		<div className={styles.container}>
			{items.map((item,index) => (
                <Step title={item.title} description={item.description} key={item.title} icon={item.icon} id={index}/>
			))}
		</div>
	);
};

export default Stepper;
