import axios from "axios"
import {Nft} from "../redux/reducer/nft"
import{Login} from "../redux/reducer/login"
import swal from "sweetalert"

function minting(nickname,point,minting_id,setOpen,open){
    return async(dispatch,getState)=>{
        const user = await axios({
            method : "post",
            url:"http://192.168.0.112:8000/minting",
            data :{
                nickname,point,minting_id
            }
        })
        .then((e)=>{
            const nft = e.data.nft
            const nftcount = e.data.nftcount
            const mynft = e.data.mynft
            const userData = e.data.user
            const data = true
            console.log("액션 실행");
            swal("민팅성공!","NFT 페이지를 통해 확인해주세요")
            .then(()=>{
                dispatch(Nft.nft({nft}))
                dispatch(Nft.nftcount({nftcount}))
                dispatch(Nft.mynft({mynft}))
                setTimeout(() => {
                    dispatch(Login.login({userData,data})) 
                }, 2500);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}



export const mintingAction = {minting}