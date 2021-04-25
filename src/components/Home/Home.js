import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import NumbersGroupForm from '../NumbersGroupForm/NumbersGroupForm';

export default function Home() {
    return (
        <>
            <NavBar />
            <h1>HOME</h1>
            <NumbersGroupForm />
        </>
    );
}