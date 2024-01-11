import React, { FC } from "react";
import { categories } from "../App";
import { CategoryProps } from "../App.types";
import { useParams } from "react-router-dom";

const Category: FC<CategoryProps> = ( { user, handleModal } ) => {
    let { category, categoryID } = useParams();
    return <>{categoryID}</>
}

export default Category;