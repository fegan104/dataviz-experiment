ggplot(data = merged)+
  stat_summary(
    mapping = aes(x = vis, y = error),
    fun.y = mean,
    fun.data = "mean_cl_boot",
    fun.args=list(B=1000, conf.int=0.95)
  )