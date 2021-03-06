import React, { Component } from "react"
import { Editor } from "slate-react"
import { Value } from "slate"

import Icon from "react-icons-kit"
import { bold } from "react-icons-kit/feather/bold"
import { italic } from "react-icons-kit/feather/italic"
import { list } from "react-icons-kit/feather/list"
import { ic_format_list_numbered } from "react-icons-kit/md/ic_format_list_numbered"
import { underline } from "react-icons-kit/feather/underline"

import isHotkey from "is-hotkey"

import FormatToolbar from "./FormatToolbar"

import { connect } from "react-redux"
import { addProductDescriptionChanged } from "../../../actions"

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: ''
                            }
                        ]
                    }
                ]
            }
        ]
    }
})


class TextEditor extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: initialValue
        }
        this.onChange = this.onChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.renderMark = this.renderMark.bind(this)
        this.isMarkActive = this.isMarkActive.bind(this)
        this.onButtonClicked = this.onButtonClicked.bind(this)
        this.hasBlock = this.hasBlock.bind(this)
    }

    isMarkActive(type){
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type == type)
    }

    hasBlock(type){
        const { value } = this.state
        return value.blocks.some(node => node.type == type)
    }

    onChange({ value }){
        this.props.dispatch(addProductDescriptionChanged(value))
    }

    renderMark(props){
        switch(props.mark.type){
            case 'bold':
                return (
                    <strong>{props.children}</strong>
                )
            case 'italic':
                return (
                    <em property="italic">
                        {props.children}
                    </em>
                )
            case 'list':
                return ( 
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul>
                )
            case 'ordered-list':
                return (
                    <ol {...props.attributes}>
                        {props.children}
                    </ol>
                )
            case 'underline':
                return (
                    <u {...props.attributes}>
                        {props.children}
                    </u>
                )
        }
    }

    onKeyDown(e, change, next){

        if(isHotkey('mod+b', e)){
            change.toggleMark('bold')
            return true
        } else
        if(isHotkey('mod+u', e)){
            change.toggleMark('underline')
            return true
        } else
        if(isHotkey('mod+n', e)){
            change.toggleMark('numbered-list')
            return true
        } else 
        if(isHotkey('mod+l', e)){
            change.toggleMark('list')
            return true
        } else 
        if(isHotkey('mod+i', e)){
            change.toggleMark('italic')
            return true
        } else {
            return next()
        }
        e.preventDefault()
    }

    onButtonClicked(e, type){
        e.preventDefault()
        this.editor.toggleMark(type)
    }

    render(){
        return (
             <div className="text-editor">
                <FormatToolbar>
                    <button style={{ color: this.isMarkActive('bold') ? 'black' : 'rgb(204, 204, 204)' }} className="tooltip-icon-button" onMouseDown={e => this.onButtonClicked(e, 'bold')}>
                        <Icon icon={bold} />
                    </button>
                    <button style={{color: this.isMarkActive('italic') ? 'black' : 'rgb(204, 204, 204)' }} className="tooltip-icon-button" onMouseDown={e => this.onButtonClicked(e, 'italic')}>
                        <Icon icon={italic} />
                    </button>
                    <button style={{color: this.isMarkActive('list') ? 'black' : 'rgb(204, 204, 204)' }} className="tooltip-icon-button" onMouseDown={e => this.onButtonClicked(e, 'list')}>
                        <Icon icon={list} />
                    </button>
                    <button style={{color: this.isMarkActive('ordered-list') ? 'black' : 'rgb(204, 204, 204)' }} className="tooltip-icon-button" onMouseDown={e => this.onButtonClicked(e, 'ordered-list')}>
                        <Icon icon={ic_format_list_numbered} />
                    </button>
                    <button style={{color: this.isMarkActive('underline') ? 'black' : 'rgb(204, 204, 204)' }} className="tooltip-icon-button" onMouseDown={e => this.onButtonClicked(e, 'underline')}>
                        <Icon icon={underline} />
                    </button>
                </FormatToolbar>
                <Editor 
                    ref={ node => this.editor = node }
                    value = {this.props.value} 
                    onChange = {this.onChange} 
                    onKeyDown = {this.onKeyDown}
                    renderMark = {this.renderMark} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    value: state.products.form.description
})

export default connect(mapStateToProps)(TextEditor)