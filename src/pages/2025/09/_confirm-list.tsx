import { For } from "solid-js";

const dummyData = [
	[
		"名前1",
		"TRUE",
		"TRUE",
		"TRUE",
		"TRUE",
		"神様に喜ばれる働き方",
		"神様が導かれる結婚への道のり",
	],
	[
		"名前2",
		"TRUE",
		"TRUE",
		"TRUE",
		"TRUE",
		"神様が導かれる結婚への道のり",
		"奉仕を通して受ける豊かな祝福",
	],
	["名前3", "TRUE", "TRUE", "TRUE", "", "献身の意味とその歩み", ""],
	["名前4", "TRUE", "", "", "", "", ""],
];

export default function ApplyList() {
	return (
		<ul class="space-y-2">
			<For each={dummyData}>
				{(item) => (
					<li class="bg-white rounded shadow p-4 space-y-1 text-sm">
						<div class="font-bold">{item[0]}</div>

						<div class="flex space-x-2">
							<For each={item.slice(1, 5)}>
								{(val, idx) => (
									<span>
										{["夕", "宿", "朝", "昼"][idx()]}
										{val === "TRUE" ? "〇" : "✕"}
									</span>
								)}
							</For>
						</div>

						<div class="text-xs">
							<div>分科会第一希望：{item[5] || "-"}</div>
							<div>分科会第二希望：{item[6] || "-"}</div>
						</div>
					</li>
				)}
			</For>
		</ul>
	);
}
