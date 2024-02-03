import { Amplify } from "aws-amplify";

export function initAmplify() {
    Amplify.configure({
        aws_cognito_region: "ap-northeast-1",
        aws_user_pools_id: "ap-northeast-1_0uHlOwYnn",
        aws_user_pools_web_client_id: "16pd1kudau74tv58si65heua8e",
        aws_cognito_identity_pool_id: 
            "ap-northeast-1:2a174e29-e63c-4cfe-909a-6a10bd65c4a3"
    })

}