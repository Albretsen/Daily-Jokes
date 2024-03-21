import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from './Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../state-management/reduxStore';
import Modal from '../generalUI/Modal';

export default function LoadingIndicatorGlobal() {
    const { visible } = useSelector((state: RootState) => state.loading);

    if (!visible) return null

    return (
        <Modal modalVisible={true}>
            <ActivityIndicator size="large" color={colors.blue.medium} />
        </Modal>
    );
};
