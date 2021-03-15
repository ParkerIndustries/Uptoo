import React, { Component } from 'react'
import { Layout, Typography, Input, Button, Space } from 'antd'
import api from '../Api'

const { Content } = Layout
const { Title } = Typography

class ProductInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            data: [{key:'', value:''}],
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputDescription = async event => {
        const description = event.target.value
        this.setState({ description })
    }

    handleChangeInputKey = async event => {
        var data = { ...this.state.data }
        data.key = event.target.value;
        this.setState({ data })
    }

    handleChangeInputValue = async event => {
        var data = { ...this.state.data }
        data.value = event.target.value;
        this.setState({ data })
    }

    handleIncludeProduct = async () => {
        const { title, description, data } = this.state
        const payload = { title, description, data }

        await api.insertProduct(payload).then(res => {
            window.alert(`Produit crée avec succès`)
            this.setState({
                title: '',
                description: '',
                data: [{key:'', value:''}]
            })
        })
    }

    render() {
        const { title, description, datakey, datavalue } = this.state
        return (
            <Content bordered style={{ marginTop: 50, padding: 50, boxShadow: "10px 20px 30px rgba(90, 90, 90, 0.2)", borderRadius: 4 }}>
                <Title>Créer un produit</Title>

                <Title level={3}>Titre: </Title>
                <Input
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                    allowClear
                />
                    
                <Title level={3} style={{marginTop:20}}>Description: </Title>
                <Input
                    type="text"
                    value={description}
                    onChange={this.handleChangeInputDescription}
                    allowClear
                />

                <Title level={3} style={{marginTop:20}}>Key: </Title>
                <Input
                    type="text"
                    value={datakey}
                    onChange={this.handleChangeInputKey}
                    allowClear
                />

                <Title level={3} style={{marginTop:20}}>Value: </Title>
                <Input
                    type="text"
                    value={datavalue}
                    onChange={this.handleChangeInputValue}
                    allowClear
                />
                <Space style={{marginTop:40}}>
                    <Button type="primary" onClick={this.handleIncludeProduct} href={'/products/list'}>Ajouter</Button>
                    <Button type="danger" href={'/products/list'}>Annuler</Button>
                </Space>
            </Content>
        )
    }
}

export default ProductInsert