import React, { FC, useEffect, useState } from "react";
import { CategoryPageProps, CategoryProps } from "../App.types";
import { useParams } from "react-router-dom";
import { Divider, Chip, Container } from "@mui/material";
import Header from "../components/Miscellaneous/Header";
import NonPinnedPost from "../components/Post/NonPinnedPost";
import PinnedPost from "../components/Post/PinnedPost";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { fetchAllCategories, fetchAllCategoryPosts } from "../components/Miscellaneous/apiRequests";
import NoPage from "./NoPage";

const CategoryPage: FC<CategoryPageProps> = ( { user, handleLogout, handleModal } ) => {
    let { category } = useParams();
    const [pinnedPosts, setPinnedPosts] = useState([]);
    const [categoryTopics, setCategoryTopics] = useState<CategoryProps[]>([]);
    const [loading, setLoading] = useState(true);

    const populatePinnedPosts = () => pinnedPosts.map(post => (
          <PinnedPost user={user} post={post} handleModal={handleModal}/>
      ));

    const populateCategoryPosts = () => categoryTopics.filter(categoryData => categoryData.name === category).map(categoryData => (
        <div key={categoryData.id}>
        <Divider><Chip label={ categoryData.name } size='medium'/></Divider>
        {categoryData.posts.filter(post => !post.is_pinned).map(post => (
                
                <NonPinnedPost user={user} post={post} handleModal={handleModal}/>
            ))}
        </div>
    ));

    useEffect(() => {
        fetchAllCategoryPosts()
        .then(response => {
            if ('categories' in response && response.success) {
                setCategoryTopics(response.categories);
            }
            if ('pinned_posts' in response && response.success) {
                setPinnedPosts(response.pinned_posts);}
            if ('errors' in response && !response.success) handleModal(response.errors);
            setLoading(false);
        });
        
    }, [handleModal]);



    return loading ? <></> :!user.logged_in 
        ? (<NoPage statusCode={401} />)
        : !categoryTopics.find(categoryData => categoryData.name === category)
            ? (<NoPage statusCode={404} />)
            : (<>
                <PrimarySearchAppBar user={user} categories={categoryTopics} handleLogout={handleLogout} handleModal={handleModal}/>
                <Container maxWidth='xl'>
                    <Header title={category}/>
                    <>{populatePinnedPosts()}</>
                    <>{populateCategoryPosts()}</>
                </Container>
            </>)
}

export default CategoryPage;