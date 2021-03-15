import React, { Component } from 'react'
import { Layout, Typography, Input, Button, Space } from 'antd'
import api from '../Api'

const { Content } = Layout
const { Title } = Typography

class ProductUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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

    handleUpdateProduct = async () => {
        const { id, title, description, data } = this.state
        const payload = { id, title, description, data }

        await api.updateProductById(id, payload).then(res => {
            window.alert(`Product updated successfully`)
            this.setState({
                title: '',
                description: '',
                data: [{key:'', value:''}]
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const product = await api.getProductById(id)
        this.setState({
            title: product.data.data.title,
            description: product.data.data.description,
            data: [{key: product.data.data.data[0].key, value:product.data.data.data[0].value}],
        })
    }

    render() {
        const { title, description, data } = this.state

        return (
            <Content style={{ marginTop: 50, padding: 50, boxShadow: "10px 20px 30px rgba(90, 90, 90, 0.2)", borderRadius: 4 }}>
                <Title>Modifier un produit</Title>

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
                    value={data.key}
                    onChange={this.handleChangeInputKey}
                    allowClear
                />

                <Title level={3} style={{marginTop:20}}>Value: </Title>
                <Input
                    type="text"
                    value={data.value}
                    onChange={this.handleChangeInputValue}
                    allowClear
                />
                <Space style={{marginTop:40}}>
                    <Button type="primary" onClick={this.handleUpdateProduct} href={'/products/list'}>Modifier</Button>
                    <Button type="danger" href={'/products/list'}>Annuler</Button>
                </Space>
            </Content>
        )
    }
}

export default ProductUpdate