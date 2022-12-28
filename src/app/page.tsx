import { redirect } from "next/navigation";
import Header from "../components/Header";
import { getSession } from "../utils/getSession";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <Header session={session} />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
        reprehenderit aliquam magni libero quidem ex sunt debitis quae
        laboriosam animi labore, suscipit magnam quaerat voluptates placeat fuga
        earum eligendi inventore, quos doloremque aliquid nihil voluptas?
        Obcaecati ab maxime maiores tempora, reiciendis expedita? Amet eaque eos
        cum debitis ea. Ipsam amet rerum sed! Vero eveniet rem laborum expedita
        itaque quas officiis, ab, fugiat tempora facilis omnis eaque voluptate
        incidunt. Qui repudiandae voluptates blanditiis! Voluptatum incidunt a
        enim illum, vel velit modi. Assumenda cumque porro repellendus obcaecati
        quia similique laudantium molestias nostrum consequuntur debitis sunt,
        aliquid mollitia voluptate aut expedita doloremque ad officiis alias ea
        a magni itaque. Aliquid quidem perferendis corporis maiores esse vero
        aperiam, iusto deleniti, sint ab nesciunt aut adipisci. Minus laborum,
        optio commodi totam est ullam, placeat, ipsum dignissimos atque ad
        voluptate blanditiis tempore magni! Ratione, modi temporibus? Quo, saepe
        praesentium. Culpa laboriosam mollitia quod totam sequi ab est ullam qui
        aliquam at, eum harum doloribus repudiandae, voluptas vitae accusamus
        praesentium ipsam molestias asperiores non quos expedita! Non
        consectetur corporis nobis. Repudiandae voluptates sit nobis amet optio
        ut quaerat quibusdam in illum perspiciatis pariatur quidem, quam minus
        ullam recusandae praesentium possimus numquam accusantium ab reiciendis
        aliquam ea rerum! Id totam neque nulla veniam quasi, porro, eum
        assumenda natus velit voluptate officiis saepe perferendis dolores quod
        libero ab ratione ducimus repellat minus obcaecati consequatur
        blanditiis beatae ullam. Magnam, nisi vitae ullam eum dignissimos
        laudantium cum ipsum quis molestiae, ea excepturi sequi. Facere unde
        dignissimos inventore alias dicta tenetur illo id modi quidem maiores
        iusto cupiditate neque, at debitis recusandae? Itaque accusamus
        dignissimos enim possimus quisquam quis exercitationem adipisci dolorem
        assumenda voluptatibus ex, sequi odit voluptatum voluptate eum doloribus
        officia? Cupiditate perferendis eligendi debitis repellendus vero
        aliquid praesentium doloribus quis quasi! Iure, quaerat. Autem
        consectetur eligendi inventore delectus quibusdam quos assumenda?
        Exercitationem expedita earum maiores ea sit quasi corporis, nobis,
        facere mollitia at odit quas omnis error, provident necessitatibus quae
        eligendi deserunt impedit magnam! Ut odio ipsam, commodi odit quibusdam,
        possimus quisquam atque saepe nostrum quaerat soluta repellat assumenda
        explicabo. Sapiente accusamus ad recusandae inventore totam incidunt vel
        aperiam alias ipsum cum odit accusantium soluta itaque cupiditate magni
        aliquid placeat eius suscipit, distinctio enim deserunt corrupti
        asperiores optio porro! Voluptatum ab autem porro molestias vero ipsa
        nemo deserunt quia consectetur, totam illum aperiam deleniti explicabo!
        Omnis deserunt aspernatur aperiam eos rerum consequatur, autem
        quibusdam, quasi optio ducimus qui accusantium et numquam nemo! Eos
        ipsum unde corporis minima. Natus vero corrupti quod accusamus qui
        cumque voluptatem animi adipisci, totam fuga rem. Quos officiis
        laudantium iste, suscipit minima vero vitae aliquid beatae est sed
        temporibus qui nostrum, facere vel nesciunt ratione eos. Fugiat eum, qui
        in nulla tempora tempore aperiam dolorum ipsa cum! Dolorem iusto
        deserunt amet veniam non est perspiciatis assumenda ducimus temporibus
        eaque vel, nesciunt vitae aspernatur beatae dolores fugit suscipit, odio
        tempore. Quibusdam provident dicta soluta earum omnis adipisci aut
        architecto! Ipsam rerum quasi dignissimos. Omnis architecto dignissimos
        error assumenda? Iusto ab fugit, voluptates vitae odit incidunt, magnam
        quo asperiores doloribus, obcaecati laborum? Molestiae in cumque
        accusantium. Voluptatibus ratione consequuntur nemo, iusto reiciendis
        est, dolorum, ullam ipsum accusantium numquam vitae facilis amet? Rem
        obcaecati labore minima magni quos eos, harum reiciendis. A debitis,
        laborum, pariatur asperiores quis eos laudantium architecto in officiis
        illum dolorum, autem quo facilis ad dignissimos tempora necessitatibus
        dolore eius. Atque nobis minima, in unde, possimus deserunt inventore
        sunt corrupti molestias ullam, et natus soluta excepturi nisi tempora!
        Voluptates officia ut officiis impedit repudiandae laborum numquam
        fugiat eos modi consectetur itaque ducimus ipsam vitae nostrum cum
        voluptatum, quibusdam ratione atque sint similique hic. Unde minima sed
        id voluptatum sit doloribus atque pariatur molestiae sapiente ullam
        harum magnam rerum facere laboriosam maxime, repudiandae veritatis odio
        consequatur asperiores ab dolore suscipit eum accusamus? Non temporibus
        recusandae necessitatibus? Officia nemo quia enim eius quaerat nisi,
        aspernatur cumque incidunt illum, laborum facilis tempora obcaecati nam
        non? Molestias cumque dolores voluptates, adipisci explicabo
        voluptatibus inventore ratione accusantium ullam numquam vel vero,
        dolore iusto omnis at perspiciatis repellat minus maiores consectetur
        suscipit voluptate voluptatum deleniti mollitia odit. Deserunt accusamus
        obcaecati quia cumque atque magnam. Rerum adipisci, cumque repudiandae
        quis accusamus quo modi neque non iste quam id blanditiis. Molestias
        molestiae incidunt asperiores rem obcaecati sapiente, unde quibusdam
        rerum ratione laboriosam, porro odit sequi beatae repudiandae? Modi
        placeat at id impedit eveniet, minima fugiat beatae magni non quidem
        totam ex qui ea hic praesentium vitae sequi neque quas aut voluptatem
        laborum voluptas laudantium autem. Tenetur doloribus, voluptates
        corporis inventore, non reiciendis harum, qui maxime voluptatem
        consequatur perspiciatis exercitationem? Expedita officiis possimus est
        doloribus dolores, magni facilis temporibus quaerat corporis cupiditate
        nobis quos error neque voluptas obcaecati distinctio quibusdam quidem
        voluptatibus eum hic. Voluptas omnis, maxime quibusdam quas neque labore
        eveniet. Maiores quam sint magni in, dignissimos optio repellendus quae
        laboriosam. Placeat repudiandae repellendus molestiae fugiat veniam eius
        animi dolore dolores. Rerum aut molestiae cumque expedita eaque, itaque
        ullam voluptate, reiciendis temporibus sit officiis cupiditate
        reprehenderit doloribus beatae minima accusamus dicta. Quasi libero,
        saepe sunt veniam recusandae quam hic eius pariatur perferendis, quas
        qui assumenda enim quia. Dolor suscipit et nemo, tenetur amet tempore
        soluta distinctio odio reiciendis exercitationem inventore pariatur
        magni voluptatibus quia nisi explicabo id enim aperiam ex? Quidem
        aliquid suscipit voluptatum quo eveniet iusto magni qui nulla animi
        dignissimos minima sapiente iste sit, quos quibusdam repellat
        consequuntur tempora quae rerum consequatur enim amet architecto. Vero
        numquam voluptatem expedita saepe suscipit quo fuga. Doloremque ullam,
        natus ratione architecto tempora sed aliquid nam, provident porro culpa
        excepturi esse non assumenda! Eveniet aut, excepturi ducimus, illum
        voluptatum veniam ipsa dolores ex, similique dolore doloremque alias
        ipsam fugiat nesciunt porro sit sed laboriosam et? Libero dignissimos
        fugit magni illum molestias nisi incidunt reiciendis ipsa iusto
        cupiditate, maxime architecto corporis debitis aliquid nulla possimus
        consequuntur quas numquam aperiam mollitia? Neque, facilis. Esse illo
        suscipit neque error et natus corrupti eveniet numquam porro eum maxime
        repudiandae cum fugiat doloremque vero ipsam, amet dignissimos fugit
        quam facere ut nam, delectus quis. Enim magni temporibus asperiores
        inventore soluta repellendus.
      </p>
    </main>
  );
}
