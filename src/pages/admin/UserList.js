import {useEffect, useState} from "react";
import PaginationNavigator from "../../layout/PaginationNavigator";
import { X } from "lucide-react"
import styles from "../rank/rank.module.scss";
import FlexibleTable from "../../shared/table/FlexibleTable";
import TableBackGroundCard from "../../shared/TableBackGroundCard";
import {useApiQuery} from "../../hooks/useApiQuery";
import {useQueryParam} from "../../hooks/QueryParam";
import axios from "axios";
import Spinner from "../../shared/Spinner";

const initColumns = [
    { accessorKey: "id", header: "순번" },
    { accessorKey: "nickname", header: "닉네임" },
    { accessorKey: "lastLogin", header: "최근 로그인" },
    { accessorKey: "createdAt", header: "가입 날짜" },
];

const usersRequest = async (params) => {
    const response = await axios.get(`/admin/users`, {params});
    return response.data;
};

const UserList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [params, setParams] = useQueryParam();
    const [tableRows, setTableRows] = useState([]);
    const { data, isLoading, isFetching } = useApiQuery(
        ['/admin/users', params], // queryKey에 params 포함
        () => usersRequest(params)
    );

    useEffect(() => {
        if (data) {
            setTableRows(data.users);
        }
    }, [data])

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("검색어:", searchTerm)
        setParams({
            ...params,
            page: 1,
            nickname: searchTerm.trim()
        })
    }

    const handleClearSearch = () => {
        setParams({
            ...params,
            nickname: ''
        })
        setSearchTerm("")
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Spinner show={isLoading || isFetching} />
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
                {/* 헤더 및 검색 섹션 */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">[ 유저 관리 페이지 ]</h1>
                    <form className="flex items-center space-x-2" onSubmit={handleSearch}>
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="유저 검색 ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 rounded-md flex items-center justify-center"
                                    onClick={handleClearSearch}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white hover:bg-gray-900 h-10 px-4 py-2"
                        >
                            검색
                        </button>
                    </form>
                </div>
                <TableBackGroundCard>
                    <FlexibleTable initColumns={initColumns} data={tableRows} />
                    {/* Pagination */}
                    <PaginationNavigator currentPage={data?.currentPage} totalPages={data?.totalPages}
                                         onPageChange={(page) => setParams({
                                                 ...params
                                                 ,page: page,
                                             })}/>
                </TableBackGroundCard>
            </div>
        </div>
    );
}

export default UserList;