import React, { Component } from 'react'
import { Layout, Typography, Space } from 'antd'
const { Content } = Layout
const { Title, Text } = Typography

class Home extends Component {
    render() {
        return(
            <Content bordered style={{ marginTop: 50, padding: 50, boxShadow: "10px 20px 30px rgba(90, 90, 90, 0.2)", borderRadius: 4 }}>
                <Title>Inventaire</Title>
                <Title level={2}>- Fonctionnalités:</Title>
                <Space direction="vertical">
                    <Text> - Listing des produits</Text>
                    <Text> - Ajout d'un item</Text>
                    <Text> - Modification d'un item</Text>
                    <Text> - Suppression d'item</Text>
                </Space>
            </Content>
        )
    }
}

export default Home
