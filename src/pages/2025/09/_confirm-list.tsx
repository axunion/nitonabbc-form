import { For } from "solid-js";

const dummyData = [
	[
		"名前名前",
		"TRUE",
		"TRUE",
		"TRUE",
		"TRUE",
		"神様に喜ばれる働き方",
		"神様が導かれる結婚への道のり",
	],
	[
		"名前氏名",
		"TRUE",
		"TRUE",
		"TRUE",
		"TRUE",
		"神様が導かれる結婚への道のり",
		"奉仕を通して受ける豊かな祝福",
	],
	["氏名名前", "TRUE", "TRUE", "TRUE", "", "献身の意味とその歩み", ""],
	["名前", "TRUE", "", "", "", "", ""],
];

export default function ApplyList() {
	return (
		<div class="px-4 py-2 overflow-x-auto">
			<table class="w-full min-w-max bg-white rounded shadow text-sm">
				<thead>
					<tr class="border-b border-gray-300">
						<th class="p-3 min-w-max">名前</th>
						<th class="w-12">夕食</th>
						<th class="w-12">宿泊</th>
						<th class="w-12">朝食</th>
						<th class="w-12">昼食</th>
						<th class="w-60">分科会第一希望</th>
						<th class="w-60">分科会第二希望</th>
					</tr>
				</thead>
				<tbody>
					<For each={dummyData}>
						{(item) => (
							<tr class="even:bg-gray-50">
								<td class="p-3 text-left">{item[0]}</td>
								<For each={item.slice(1, 5)}>
									{(val) => (
										<td class="text-center">{val === "TRUE" ? "○" : ""}</td>
									)}
								</For>
								<td class="p-3">{item[5] || "-"}</td>
								<td class="p-3">{item[6] || "-"}</td>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
}
