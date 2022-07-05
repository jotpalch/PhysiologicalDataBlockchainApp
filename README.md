# PhysiologicalDataBlockchainApp

## 研究動機與目的
近年來，網路的使用越來越普及，使用者的資料散佈在各個服務供應商。然而，那些使用者相關資料並未受到應有的管理和保護，進而衍伸出許多資料安全的問題，例如：臉書醜聞、2018年 Google 資料外洩醜聞。世界政府也推出 CCPA、GDPR 等使用者資料保護法。因此，各個企業必須謹慎處理使用者的資料，以及明確的規範如何取得資料的權限，以免面臨巨額的罰款。

在各式各樣的網路服務中，我們選擇了一項智慧功能，那就是智慧穿戴裝置所蒐集的生理數據去作研討以及專題發想。

至於要如何規範企業取得生理數據的權限，我們放棄從傳統的中心化管理去做改進，而是轉往研究了區塊鏈的應用，發現其應用的可能性。區塊鏈中的許多特性，例如分散式管理、不可竄改性等，都滿足了我們的需求。不過傳統、主流的區塊鏈如比特幣、以太坊因為是無需許可的，因此必須犧牲效率、能源，以抵抗女巫攻擊以及維持其嚴格的信任假設。而後來我們在與學長和教授的討論中發現了Hyperledger Fabric 。Hyperledger Fabric仰賴企業之間彼此的信任。有預訂好的參與企業，所以不需要嚴格的共識機制，並且可以在使用上擁有更多的靈活性。因此，我們選擇Hyperledger Fabric作為我們最為關鍵的技術，智能合約的撰寫成為我們達成存取控制的方法。

我們所實作的 App 平台試圖成為生理數據的「仲介商」，在生醫大廠、醫療機構以及穿戴式裝置廠商（如：Apple、Garmin）之間，使用者可以透過此平台依自身意願控制資料對廠商的授權，且廠商對使用者的了解僅僅是生理數據鏈上的一組公鑰而已，以此達成匿名性以及對使用者的安全性。

此外，我們發現，以往在使用不同廠商的穿戴式裝置時，要註冊不同品牌的App。註冊這麼多帳號，個資外洩的機率也高。若需要查看的資料分別屬於不同的廠商服務，也要登入不同的app才能找到，十分麻煩。

假設身分換成一個第三方服務提供者(生醫大廠、醫療機構等，以下簡稱TSP)有需要一大筆資料去做大數據分析等，會向廠商索取一大筆資料。在過往，如果沒有一個廠商擁有這麼多資料，TSP就需要各自去向每個廠商要求，直到資料總數達到要求為止，整個流程也欠缺完善的規劃。

為了解決上述資料主權流失、App帳號的氾濫、TSP索取資料服務的繁雜步驟緣故，我們開發了一個整合性的分散式權限管理應用程式。

## 重要貢獻
- App整合了不同廠商的資料。使用者只需要註冊一次我們App的帳號，就能享受不同廠商的穿戴式裝置提供的服務，省去了以往使用不同廠商提供的服務時需要註冊數種App帳號。
- TSP在索取資料時，如果遇到單一廠商資料不夠齊全的問題，也不需要再像以往向不同廠商索取，只需透過我們的APP，傳送一次的請求，我們就能幫她處理掉許多複雜的流程。
- 使用者在享受智慧穿戴式裝置帶來的便利的同時，也不需去擔憂數據外流的問題。透過App公鑰取代原先智慧型穿戴裝置ID，達到匿名上傳。存放在鏈上的存取控制清單(Access Control List，以下簡稱ACL)，完全是由使用者去做管理，廠商與TSP無權更改，落實資料主權歸還使用者，符合多項個資法規，迎合時代趨勢。我們也運用了區塊鏈中的多項特性優化生理數據的管理。例如：不可竄改性、軟體運作的透明度、各方共同維護的分散式帳本等。如果在未來開發相關的應用時，有一定程度的參考價值以及更進一步的開發可能。

## 設計原理

![](https://i.imgur.com/0p6XEMq.png)

	我們的App扮演的是生理數據管理與共享平台。資料提供者就是使用者，資料管理者就是裝置廠商，而資料需求者就是TSP，會跟我們的App要求使用者的資料。資料一樣放在資料庫中，但是因為經過去識別化的匿名上傳，所以不用擔心個資外洩問題，沒人能夠辨別數據為哪個使用者。

圖(二) 資料庫內資料存放狀態(ID為公鑰)
	我區塊鏈中的分散式帳本用來存放ACL，App帳號綁定MetaMask。
MetaMask是當前最火紅的軟體加密貨幣錢包。允許使用者通過瀏覽器擴充程式或App存取以太坊錢包，然後與去中心化應用程式進行互動。

圖(三) MetaMask瀏覽器擴充應用程式
接下來，我們會將應用場經分成從使用者角度出發、TSP(第三方服務提供者)角度出發去做介紹。
使用者角度出發：

圖(四)

使用者需要先向App註冊專屬的帳號，App會提供一組公鑰，這樣就能夠用此公鑰達到去識別化上傳。除此之外，使用者能綁定MetaMask，之後就能夠透過MetaMask登入App。使用者的生理數據也會在我們的App上面經過視覺化的處理，只要使用者按下登入鍵，就能夠看到自己所有數據的統計圖表。

圖(五)

緊接著，所有資料在ACL上的權限預設都是不公開的。

圖(六) 申請帳號後區塊鏈之狀態變動
若使用者想要開放權限，可以在App授權，App會去改寫區塊鏈上的ACL，開放存取。若TSP向我們的App要求資料，App會先去鏈上確認，若數量不夠會讓TSP等待，而我們也可以去通知鏈上記錄有這些資料的使用者開放授權。

TSP角度出發：

圖(七)
TSP要索取資料，總共需要三個階段。
第一階段，TSP註冊我們的App，並綁定MetaMask。之後TSP向App發送資料請求，內容是他要求那些資料(步數、心跳等)以及數量，App會去區塊鏈上確認ACL，然後給TSP一個list，內容包含符合資料需求的穿戴式裝置廠商以及廠商的使用者的公鑰，若TSP要求資料的數量不夠，通知使用者開放授權，並告知TSP數量不夠，看是要等待還是減少索取的數量。 若要求滿足，TSP可以根據list去找廠商(Google, Apple等)。
第二階段我們App會引導TSP去廠商的接口傳遞請求，廠商可根據TSP傳送的公鑰去身分鏈確認TSP是否為本人(假設正確)、並再次確認鏈上ACL，回傳TSP 由TSP公鑰加密過後的JWT(Json Web Token)。TSP可用自身私鑰解開JWT，去執行第三階段。
第三階段TSP持解密過後得到的JWT去向廠商索取資料。廠商可以確認token是否過期，同時監聽鏈上的ACL是否有被更動過，若否，則給與TSP所需資料。 
研究方法：
我們先閱覽大量的論文，如 SOCHAIN、SOTERIA 等相關區塊鏈應用，先對區塊鏈世界有點窺探，並研討當前數位身分管理相關之實際情況，了解到中心化管理的缺點以及自主身份管理之必要性。之後經過跟學長與教授的討論，確定我們要使用的關鍵技術是 Hyperledger ，我們即開始對 Hyperledger 進行更深入的研究。我們閱覽了Hyperledger Fabric的Document，並跟從上面的教學，從簡單的改configuration、撰寫chaincode，到練習透過SDK讓App與區塊鏈互動。等熟練後將Hyperledger 結合我們的App，改寫成我們需要的架構。
系統實現與實驗

圖(八)
我們的平台預計與三個主要角色互動，大眾使用者、穿戴式裝置廠商(Manufacturer)、生醫廠商等研究機構(Third-party Service Providers)。
去識別化上傳的部分，我們以Python 撰寫程式碼，模擬穿戴式裝置廠商收集到的大眾使用者的生理數據。其中，紀錄了大眾使用者的心跳、步數、體溫、血氧、血壓，五分鐘收集一次使用者的資料，上傳到 MongoDB 資料庫。穿戴式裝置廠商的資料庫內，只能看到大眾使用者的公鑰、時間、以及各項生理數據，並不會在上傳資料的同時就造成大眾使用者的隱私暴露。
第二，我們的App與使用者和TSP互動的介面，主要架構分為前端、後端以及資料庫。前後端分離，前端採用React框架，後端使用Node.js，而資料庫選擇MongoDB，並將其架設在AWS的Server上面。
在前端設計了兩個介面，分別給使用者以及廠商做操作，經過MetaMask登入之後，提供一個可視化的介面方便使用者操作自身資料的存取權，也撰寫了API與後端互動，透過資料視覺化圖表方式呈現來自各個裝置的生理數據。
TSP也能經過MetaMask登入App，來索取資料。App前端得到廠商需求後，我們透過Hyperledger Fabric SDK去鏈上確認廠商需求是否被滿足。

圖(九)
最後，進入到區塊鏈的部分。大致上是由JavaScript來撰寫，搭配shell script。而官方的Hyperledger Fabric因為有許多功能其實是這份專案用不到的，所以透過Fablo來創建區塊鏈網路架構。先寫好區塊鏈的配置(configuration)，我們架設一個機構(organization)，兩個節點(peer)。兩個節點之間有一個管道(channel)。管道中有分散式帳本可以存儲ACL，管道上可以部屬我們自己撰寫的鏈碼(chaincode)。鏈碼定義了區塊鏈有那些功能可以運用，這次我們用 fabric-contract-api 寫了三種，創建ACL、讀取ACL、以及更新ACL。

圖(十) chaincode - 創建ACL

		圖(十一) chaincode - 讀取ACL
ACL被當作一組的鍵值對(key-value)，提交給帳本。值得一提的是，因為我們的想法是不同的資料屬性(如：步數、血壓、血糖)等應該要用不同的ACL來控制，所以我們運用了 fabric-contract-api 當中的 composite key的功能，把使用者的公鑰以及資料屬性結合成新的key，而value就是資料屬性、廠商、以及權限是否開放。之後用Fablo啟動整個區塊鏈網路，以及部屬鏈碼，基本的ACL結合區塊鏈就完成了。
效能評估與成果
效能評估：
Hyperledger 中，CLI 使用最大量的 CPU，因此背後運作之機台可以分離 CLI 以及Orderer,peer等節點，並配置最大量CPU資源給運作CLI之機器，以達到最大效率。相比叢集式部署CLI服務，分散式部署CLI服務可以將最耗能的背書節點間加密簽名並行處理，可以藉此提升運作效能，並且解決因為分擔不均而導致非CLI節點CPU效能閒置的問題，在16個CPU運作狀態下相比叢集式部署可以獲得30%之效能提升。而資料庫方面，二進制存儲格式架構的MySQL DOCUMENT-BASED 在查詢操作優於基於半結構化 JSON 存儲格式的 CouchDB，因此大幅改善了 Hyperledger Fabric 讀取操作類型的效能瓶頸。此為從資料庫本身之狀態來提升系統效能。
成果：

圖(十二) APP首頁

圖(十三) 使用者授權頁面       

圖(十四) TSP資料索取申請頁面
結論
我們完整的整合簡化了過往生理數據取用時的繁雜步驟，並以區塊鏈的技術，解決時代進步下面臨的問題，讓生理數據的權限控制得以回到每個人自己手中。最終，我們也進一步的見證，區塊鏈的應用正一點一滴地融入我們的生活，即將成為未來的關鍵技術。
參考文獻
Fu, Wei-Kang, et al. “Soteria: A Provably Compliant User Right Manager Using a Novel Two-Layer Blockchain Technology.” 2020 IEEE Infrastructure Conference. IEEE, 2020.
Chang, Edward Y., et al. “DeepLinQ: distributed multi-layer ledgers for privacy-preserving data sharing.” 2018 IEEE International Conference on Artificial Intelligence and Virtual Reality (AIVR). IEEE, 2018.
Moore, Ilene N., et al. “Confidentiality and Privacy in Health Care from the Patient’s Perspective: Does HIPPA Help.” Health Matrix17 (2007): 215.
Albrecht, Jan Philipp. “How the GDPR will change the world.” Eur. Data Prot. L. Rev. 2 (2016): 287.
Butler, Tom, and Leona O’Brien. “Understanding RegTech for digital regulatory compliance.” Disrupting Finance. Palgrave Pivot, Cham, 2019. 85-102.
Yeh, Lo-Yao, et al. “SOChain: A privacy-preserving DDoS data exchange service over soc consortium blockchain.” IEEE Transactions on Engineering Management 67.4 (2020): 1487-1500.
