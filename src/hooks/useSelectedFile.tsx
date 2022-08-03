import React, { useState } from 'react'


const useSelectedFile = () => {

    const [ imageFile, setImageFile ] = useState<string>();

    const onSelectFile = (event:React.ChangeEvent<HTMLInputElement>) => {
        // FileReaderクラスはテキストファイルを読み込むためのAPIで、テキストファイルの内容を元にした処理などを行うために使います。 
        // FileReaderクラスを使うと、ファイルは文字のストリームで読み込まれます
        const reader = new FileReader();

        if(event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0])
        }

        // FileReader.onload - 読み込みが正常に完了した時に発火するイベント
        reader.onload = (readerEvent) => {
                if(readerEvent.target?.result) {
                    // as = 型アサーション(Type Assertion)とは、その推論された型や、既に型定義済みの変数の型を上書きします。
                    setImageFile(readerEvent.target.result as string)
                }
        }
    };

    return {
        imageFile, setImageFile, onSelectFile
    }
}

export default useSelectedFile