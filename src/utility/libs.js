// libs.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export {
  React,
  useDispatch,
  useSelector,
  useNavigate,
  useLocation,
  useEffect,
  useState,
  useParams,
  NavLink,

};

//Routes
import { Route, Routes } from "react-router-dom";

export {
  Route,
  Routes
}

//Api and toaster 
import { Toaster } from "react-hot-toast";
import axios from "axios";
import toast from "react-hot-toast";

export {
  Outlet,
  Toaster,
  toast,
  axios,
  
}

//Custom hooks
import { useGetAllTweets } from "../hooks/useGetAllTweets";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { useGetIndividualTweets } from "../hooks/useGetIndividualTweets";
import { useGetLoggedInUser } from "../hooks/useGetLoggedInUser";
import { useSearch } from "../hooks/useSearch";

export {
    useGetAllTweets,
    useGetAllUsers,
    useGetIndividualTweets,
    useGetLoggedInUser,
    useSearch
}

//Custom Components
import MainLayout from "../components/layout/MainLayout";
import EditProfile from "../components/mainFeed/EditProfile"
import MainFeed from "../components/mainFeed/MainFeed"
import TweetCard from "../components/mainFeed/TweetCard"
import TweetInput from "../components/mainFeed/TweetInput"
import FollowTabs from "../components/FollowTabs"
import LeftSideBar from "../components/LeftSideBar"
import Profile from "../components/Profile"
import RightSideBar from "../components/RightSideBar"

export {
  MainLayout,
  EditProfile,
  MainFeed,
  TweetCard,
  TweetInput,
  FollowTabs,
  LeftSideBar,
  Profile,
  RightSideBar
}

//Custom Pages
import Home from "../pages/Home"
import Login from "../pages/Login"
import MainContent from "../pages/MainContent"
import Register from "../pages/Register"
import UserProfile from "../pages/UserProfile"

export {
  Home,
  Login,
  MainContent,
  Register,
  UserProfile
}

//Static files
import logo from "../assets/twitter.logo/logo.jpg"
export {
  logo
}