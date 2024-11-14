import axios from "axios";

async function create() {
    let chapaSubAccountId;
    const chapaResponse = await axios.post(
        "https://api.chapa.co/v1/subaccount",
        {
            "business_name": "please work",
            "account_name": "test",
            "bank_code": 855,
            "account_number": "0900112233",
            "split_value": 0.02,
            "split_type": "percentage"
        },
        {
            headers: {
                'Authorization': 'Bearer CHASECK_TEST-T8gdjXmlGbplIbN8nC8wQCevIUaPtyUm',
                'Content-Type': 'application/json'
            }
        }
    ).catch(error => {
        console.log(error.response.data)
    });

    if (chapaResponse.data.status === "success") {
        chapaSubAccountId = chapaResponse.data.data.subaccount_id;
    } else {
        return { status: "error", message: "Please insert correct details", data: null }
    }

    if (!chapaSubAccountId) return { status: "ChapaSomeThingWentWrong", message: "Something went wrong when connecting your bank account", data: null }

    return { status: "success", message: "successfully created", data: chapaSubAccountId }
}

async function page() {
    const { status, data } = await create()
    console.log(status, "======= status ========")
    console.log(data, "======= data ========")
    return (
        <div>page</div>
    )
}

export default page