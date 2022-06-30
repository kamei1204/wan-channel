import React from 'react'
import { GetServerSidePropsContext } from "next"
import { firestore } from '../../../FireBase/ClientApp'
import { doc, getDoc } from 'firebase/firestore'
import { community } from '../../../Atoms/communityAtoms'
// safeJsonStringifyを使用する事で、シリアライザーエラーを防ぐ
import  safeJsonStringify  from 'json-stringify-safe'
import NotFound from '../../../components/community/NotFound'
import Header from '../../../components/community/Header'
import PageContent from '../../../components/Layout/PageContent'
import CreatePostLink from '../../../components/Post/CreatePostLink'

type communityPageProps = {
    communityData: community;
}

const communityPage:React.FC<communityPageProps> = ({ communityData }) => {
    console.log('コミュニティーのデータ', communityData);

    if(!communityData) {
        return  <NotFound />
    }

    return (
        <>
            <Header communityData={communityData}/>
            <PageContent>
                {/* 子要素1 左 */}
                <>
                    <CreatePostLink />
                </>
                {/* 子要素2 右 */}
                <>
                    <div>右側</div>
                </>
            </PageContent>
        </>
)}

//SSRのメリット
//初めのリクエストで全てのリソースを読み込む必要がないため、CSRより画面表示が早い
//複数ページのアプリケーションを構築できるので、ページ単位でOGPの設定・SEO対策が可

export async function getServerSideProps(context: GetServerSidePropsContext) {

    // コミュニティーデータをクライアントコンポーネントに渡すために取得する
    //context.queryは// URL の ? 以降のクエリパラメーターのこと

    try {                                  //URLのクエリ文字列(クエリパラメータ)は常に文字列なので、これを文字列型にする事で、コンパイルエラーを防ぐ
        const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                // 実際のデータをcommunityDataに抽出する
                // 文字列化されたデータを解析する                  //safeJsonStringifyオブジェクト参照時,オブジェクトのIDが必要
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }))
                : "",
            },
        };
    } catch (error) {
        console.log("getServerSidePropsError", error)
    }
}
export default communityPage;