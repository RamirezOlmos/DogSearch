"use client";
import type { PaginationProps } from "antd";

import { FC, useState } from "react";

import { ConfigProvider, Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  numberOfDogs: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  numberOfDogs,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") ?? "1";
  let per_page = searchParams.get("per_page") ?? "12";
  // pagination states
  const [number, setNumber] = useState<number>(1);
  //   handle Pagination
  const [postsPerPage, setPostsPerPage] = useState<number>(12);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    per_page = pageSize.toString();
  };

  const handlePage = (pageNumber: number) => {
    const nextSection: HTMLElement | null = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
    router.push(`/dogs?page=${pageNumber}&per_page=${per_page}`);
    page = pageNumber.toString();
  };

  return (
    <div className="flex gap-2">
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "light-purple",
            },
          },
          token: {
            colorText: "#3F1D38",
            colorPrimary: "#5D12D2",
          },
        }}
      >
        <Pagination
          defaultCurrent={parseInt(page)}
          responsive={true}
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={[12, 24, 48, 100]}
          defaultPageSize={12}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          total={numberOfDogs}
          onChange={handlePage}
          className="flex flex-row justify-center"
        />
      </ConfigProvider>
    </div>
  );
};

export default PaginationControls;
